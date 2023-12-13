import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
const PublicDecorator = Reflector.createDecorator<boolean>({
  key: IS_PUBLIC_KEY,
});
export const PublicRoute = () => PublicDecorator(true);
