export interface IAppConfig {
  name: string;
  port: number;
  isProduction: boolean;
  now: Date;
  uuid: string;
  gRPCPort: number;
  sha: string;
}
