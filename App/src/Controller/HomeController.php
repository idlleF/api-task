<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends AbstractController
{
    #[Route('/projects', name: 'projects')]
    public function index(): Response
    {
        return $this->render('home/projects.html.twig');
    }

    #[Route('/project/{id}', name: 'project')]
    public function project(int $id): Response
    {
        return $this->render('home/project.html.twig', ['id' => $id]);
    }

    #[Route('/task/{id}', name: 'task')]
    public function task(int $id): Response
    {
        return $this->render('home/task.html.twig', ['id' => $id]);
    }
}