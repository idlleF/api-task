<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231017163957 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("ALTER TABLE project ALTER COLUMN status TYPE statuses USING status::statuses");
        $this->addSql("ALTER TABLE project ALTER COLUMN status SET DEFAULT 'new'");
    }

    public function down(Schema $schema): void
    {
        $this->addSql('CREATE SCHEMA public');
    }
}
