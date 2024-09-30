import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEYS } from '~shared/keys/api-keys';

export class HttpSerivce {
	private baseUrl: string;
	private fetchingService: AxiosInstance;
	private apiVersion: string;

	constructor(
		baseUrl = process.env.SERVER_URL,
		fetchingService = axios,
		apiVersion = 'api',
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = fetchingService;
		this.apiVersion = apiVersion;
	}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}/${this.apiVersion}/${url}`;
	}

	private populateTokenToHeaderConfig(): { Authorization: string } {
		return {
			Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`,
		};
	}

	private extractUrlAndDataFromConfig(
		config: AxiosRequestConfig,
	): Omit<AxiosRequestConfig, 'data' | 'url'> {
		return config;
	}

	protected get<TResponse>(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse<TResponse>> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.get<TResponse>(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}

	protected post<TData, TResponse>(
		config: AxiosRequestConfig<TData>,
		withAuth = true,
	): Promise<AxiosResponse<TResponse>> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.post<TResponse>(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	protected put<TData, TResponse>(
		config: AxiosRequestConfig<TData>,
		withAuth = true,
	): Promise<AxiosResponse<TResponse>> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.put<TResponse>(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	protected delete<TResponse>(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse<TResponse>> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.delete<TResponse>(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}
}
