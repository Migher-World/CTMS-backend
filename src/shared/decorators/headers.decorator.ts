import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

export function Headers() {
  return applyDecorators(
    ApiHeader({
      name: 'x-company-id',
      description: "Company's ID",
    }),
  );
}
