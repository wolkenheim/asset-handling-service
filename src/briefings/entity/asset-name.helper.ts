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

    buildName(): string | null {

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

    getOrderYear(): string | null {
        let attribute = this.briefing.briefing_date;
        if (!attribute) {
            return null;
        }
        return attribute.getFullYear().toString();
    }

    getOrderMonth(): string | null {
        let attribute = this.briefing.briefing_date;
        if (!attribute) {
            return null;
        }
        return attribute.getMonth().toString().padStart(2, '0');
    }

    getKW(): string | null {
        let attribute = this.briefing.kw;
        if (!attribute) {
            return null;
        }
        return "KW" + attribute.toString().padStart(2, '0');
    }

    getVariation(): string | null {
        let attribute = this.asset.variant
        if (!attribute) {
            return null;
        }
        return "V" + attribute.toString().padStart(2, '0');
    }

    getCamera(): string | null {
        let attribute = this.asset.camera
        if (!attribute) {
            return null;
        }
        return "C" + attribute.toString().padStart(2, '0');
    }

    getJiraTicketTitle(): string | null {
        // @todo: truncate title
        let attribute = this.briefing.jira_ticket_title
        if (!attribute) {
            return null;
        }
        return attribute
    }

    getScene(): string | null {
        let attribute = this.asset.scene
        if (!attribute) {
            return null;
        }
        return "Scene_" + attribute.toString().padStart(2, '0');
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