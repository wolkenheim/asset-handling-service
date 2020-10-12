import { Asset } from "./asset.entity";
import { Briefing } from "./briefing.entity";

export class AssetNameHelper {

    private del = "_";
    private methods: string[];

    constructor(
        private briefing: Briefing,
        private asset: Asset
    ) {
        this.setMethods();
    }

    buildName(): string | null {

        let nameString = "";

        const assetNameHelper = this;
        this.methods.forEach(method => {
            const result = assetNameHelper[method]();
            if (result) {
                nameString += assetNameHelper[method]() + this.del;
            }
        })

        nameString = nameString.slice(0, nameString.length - 1);

        return nameString;
    }

    getOrderYear(): string | null {
        const attribute = this.briefing.briefing_date;
        if (!attribute) {
            return null;
        }
        return attribute.getFullYear().toString();
    }

    getOrderMonth(): string | null {
        const attribute = this.briefing.briefing_date;
        if (!attribute) {
            return null;
        }
        return attribute.getMonth().toString().padStart(2, '0');
    }

    getKW(): string | null {
        const attribute = this.briefing.kw;
        if (!attribute) {
            return null;
        }
        return "KW" + attribute.toString().padStart(2, '0');
    }

    getVariation(): string | null {
        const attribute = this.asset.variant
        if (!attribute) {
            return null;
        }
        return "V" + attribute.toString().padStart(2, '0');
    }

    getCamera(): string | null {
        const attribute = this.asset.camera
        if (!attribute) {
            return null;
        }
        return "C" + attribute.toString().padStart(2, '0');
    }

    getJiraTicketTitle(): string | null {
        // @todo: truncate title
        const attribute = this.briefing.jira_ticket_title
        if (!attribute) {
            return null;
        }
        return attribute
    }

    getScene(): string | null {
        const attribute = this.asset.scene
        if (!attribute) {
            return null;
        }
        return "Scene_" + attribute.toString().padStart(2, '0');
    }

    getHash(): string | null {
        const attribute = this.asset.hash
        if (!attribute) {
            return null;
        }
        return attribute
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
                'getHash',
                'getScene'
            ];
        }
        this.methods = methods;
    }
}