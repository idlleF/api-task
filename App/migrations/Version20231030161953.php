<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231030161953 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("ALTER TABLE task ADD COLUMN status statuses");
        $this->addSql("ALTER TABLE task ALTER COLUMN status SET DEFAULT 'new'");
    }

    public function down(Schema $schema): void
    {

    }
}
