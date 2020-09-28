import { Asset } from "./asset.entity";
import { Briefing } from "./briefing.entity";

export class AssetNameHelper {

    private del: String = "_";
    private methods: string[];

    constructor(
        private briefing: Briefing,
        private asset: Asset
    ) {
        this.setMethods();
    }

    buildName(): string {

        let nameString = "";

        let assetNameHelper = this;
        this.methods.forEach(method => {
            let result = assetNameHelper[method]();
            if (result) {
                nameString += assetNameHelper[method]() + this.del;
            }
        })

        nameString = nameString.slice(0, nameString.length - 1);

        return nameString;
    }

    getOrderYear(): string {
        return this.briefing.briefing_date.getFullYear().toString();
    }

    getOrderMonth(): string {
        return this.briefing.briefing_date.getMonth().toString().padStart(2, '0');
    }

    getKW(): string {
        return "KW" + this.briefing.kw.toString().padStart(2, '0');
    }

    getVariation(): string {
        return "V" + this.asset.variant.toString().padStart(2, '0');
    }

    getCamera(): string {
        return "C" + this.asset.camera.toString().padStart(2, '0');
    }

    getJiraTicketTitle(): string {
        // @todo: truncate title
        return this.briefing.jira_ticket_title
    }

    getScene(): string {
        return "Scene_" + this.asset.variant.toString().padStart(2, '0');
    }

    setMethods(methods?: string[]): void {
        if (!methods) {
            methods = [
                'getOrderYear',
                'getOrderMonth',
                'getKW',
                'getVariation',
                'getCamera',
                'getJiraTicketTitle',
                'getScene'
            ];
        }
        this.methods = methods;
    }
}