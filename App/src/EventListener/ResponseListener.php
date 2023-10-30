<?php

namespace App\EventListener;

use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ResponseListener implements EventSubscriberInterface
{
    private const RESPONSE_OK = 1;
    private const RESPONSE_NOK = -1;

    public function __construct(
        protected readonly ValidatorInterface $validator,
        protected readonly ProjectRepository $projectRepository,
        protected readonly EntityManagerInterface $entityManager
    ) {

    }

    public static function getSubscribedEvents(): array
    {
        return [
            'kernel.response' => 'onKernelResponse',
            'kernel.request' => 'onKernelRequest',
        ];
    }

    public function onKernelResponse(ResponseEvent $event): void
    {
        if ($event->getRequest()->isXmlHttpRequest()) {
            $response = new Response(
                json_encode($this->handleResponse($event)),  Response::HTTP_OK
            );

            $response->headers->set('Content-Type', 'application/json');

            $event->setResponse($response);
        }
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        if (
            $event->getRequest()->isMethod(Request::METHOD_POST) ||
            $event->getRequest()->isMethod(Request::METHOD_PUT)
        ) {
            $this->handleUpdateProject($event);
        }
    }


    private function handleResponse(ResponseEvent $event): array
    {
        return match (true) {
            $event->getResponse()->getStatusCode() >= 200 && $event->getResponse()->getStatusCode() < 300 => $this->handleOk($event),
            default => $this->handleNok($event)
        };
    }

    private function handleOk(ResponseEvent $event): array
    {
        return [
            'code' => static::RESPONSE_OK,
            'data' => json_decode($event->getResponse()->getContent()),
            'validation_errors' => []
        ];
    }

    private function handleNok(ResponseEvent $event): array
    {
        $violations = json_decode($event->getResponse()->getContent(), true);

        return [
            'code' => static::RESPONSE_NOK,
            'data' => [],
            'validation_errors' => $violations['violations']['violations']
        ];
    }

    private function handleUpdateProject(RequestEvent $event): void
    {
        $params = json_decode($event->getRequest()->getContent());

        if (!empty($params->project)) {
            $parts = explode('/', $params->project);
            $projectId = end($parts);

            $project = $this->projectRepository->find($projectId);

            $projectDuration = $project->getDuration();
            $transformedProjectDuration = strtotime($projectDuration->format('Y-m-d H:i:s'));
            $taskDuration = strtotime($params->duration);

            if ($transformedProjectDuration < $taskDuration) {
                $newProjectDuration = (new \DateTimeImmutable())->setTimestamp($taskDuration);
                $project->setDuration($newProjectDuration);
                $this->entityManager->persist($project);
            }

            $this->entityManager->flush();
        }
    }
}