import { Brecha } from "../../domain/models/Brecha";
import { ArgentinaDatosClient } from "../../infrastructure/http/ArgentinaDatosClient";
export declare class GetHistoricalBrechasUseCase {
    private readonly argentinaDatosClient;
    constructor(argentinaDatosClient: ArgentinaDatosClient);
    execute(baseCasa: string, againstCasa: string, from?: Date, to?: Date): Promise<Brecha[]>;
}
//# sourceMappingURL=GetHistoricalBrechasUseCase.d.ts.map