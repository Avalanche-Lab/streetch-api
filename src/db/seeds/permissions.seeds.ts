import { db } from '@/db/db.connection';
import { permissions } from '@/db/schema/v1/permission.schema';
import { logger } from '@/utils/logger.utils';
import { PermissionActions } from '@/constants/permission.constants';

export async function seedPermissions() {
  try {
    const defaultPermissions = [
      {
        name: 'user',
        description: 'Permite criar novos usuários no sistema',
        action: PermissionActions.CREATE,
      },
      {
        name: 'user',
        description: 'Permite listar e visualizar usuários',
        action: PermissionActions.READ,
      },
      {
        name: 'user',
        description: 'Permite atualizar dados de usuários',
        action: PermissionActions.UPDATE,
      },
      {
        name: 'user',
        description: 'Permite remover usuários',
        action: PermissionActions.DELETE,
      },
      {
        name: 'role',
        description: 'Permite criar novos papéis',
        action: PermissionActions.CREATE,
      },
      {
        name: 'role',
        description: 'Permite listar e visualizar papéis',
        action: PermissionActions.READ,
      },
      {
        name: 'role',
        description: 'Permite atualizar papéis',
        action: PermissionActions.UPDATE,
      },
      {
        name: 'role',
        description: 'Permite remover papéis',
        action: PermissionActions.DELETE,
      },
      {
        name: 'permission',
        description: 'Permite gerenciar todas as permissões do sistema',
        action: PermissionActions.MANAGE,
      },
      {
        name: 'permission',
        description: 'Permite gerenciar configurações do sistema',
        action: PermissionActions.MANAGE,
      },
    ];

    logger.info('Seeding permissions...');

    for (const permission of defaultPermissions) {
      await db
        .insert(permissions)
        .values(permission)
        .onConflictDoNothing({ target: permissions.name });
    }

    logger.info('Permissions seeded successfully');
  } catch (error) {
    logger.error('Error seeding permissions:', error);
    throw error;
  }
}

if (require.main === module) {
  seedPermissions()
    .then(() => process.exit(0))
    .catch((error) => {
      logger.error('Failed to seed permissions:', error);
      process.exit(1);
    });
}
