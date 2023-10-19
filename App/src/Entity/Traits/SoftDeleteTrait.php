<?php

namespace App\Entity\Traits;

use ApiPlatform\Metadata\ApiProperty;
use DateTimeImmutable;

trait SoftDeleteTrait {

    public function getDeletedAt(): ?DateTimeImmutable
    {
        return $this->deletedAt;
    }

    #[ApiProperty(required: true)]
    public function setDeletedAt(?DateTimeImmutable $deletedAt): static
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }
}