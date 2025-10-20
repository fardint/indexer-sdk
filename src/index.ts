export interface IndexerSdkOptions {
	baseUrl?: string;
}

export class IndexerSDK {
	public readonly baseUrl: string;

	constructor(options: IndexerSdkOptions = {}) {
		this.baseUrl = options.baseUrl ?? "https://api.example.com";
	}

	public getHealth(): string {
		return "ok";
	}
}

export function createClient(options: IndexerSdkOptions = {}): IndexerSDK {
	return new IndexerSDK(options);
}

export default {
	IndexerSDK,
	createClient,
};

