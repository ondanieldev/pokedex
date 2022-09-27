interface IAPIConfig {
  port: number;
}

export const apiConfig: IAPIConfig = {
  port: Number(process.env.API_PORT) || 3000,
};

export default apiConfig;
