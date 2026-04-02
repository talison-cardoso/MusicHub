/// <reference types="astro/client" />

interface JWTPayload {
  id: string;
  username: string;
  iat?: number;
  exp?: number;
}

declare namespace App {
  interface Locals {
    user?: JWTPayload;
  }
}
