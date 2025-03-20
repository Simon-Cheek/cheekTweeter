export interface StatusDto {
  readonly post: string;
  readonly user: string; // User converted to JSON
  readonly timestamp: number;
}
