import { MassOnSpring } from "./massOnSpring";

const DRAW_HEIGHT = 30;
const DRAW_RADIUS = 10;


export class MassOnSpringView {
    private title: string;
    private static idCounter = 0;
    private id: number;
    private drawHeight: number;
    private drawRadius: number;
    private myMos: MassOnSpring;
    private canvas: HTMLCanvasElement;

    constructor(mos: MassOnSpring, title: string) {
        this.title = title;
        this.id = MassOnSpringView.idCounter++;
        this.drawHeight  = DRAW_HEIGHT;
        this.drawRadius  = DRAW_RADIUS;
        this.myMos = mos;
    }

    createHtml(): HTMLElement {
        let div = document.createElement("div");
        div.id = "MOSDiv" + this.id;

        let h2 = document.createElement("h2");
        h2.innerHTML = this.title;
        div.appendChild(h2);

        this.canvas = document.createElement("canvas");
        this.canvas.id="mosCanvas" + this.id;
        this.canvas.width  = 500;
        this.canvas.height = 60; 
        this.canvas.style.border = "1px solid #000000";
        div.appendChild(this.canvas);

        div.appendChild(this.createStatsTable());

        div.appendChild(document.createElement("br"));

        let codeElem = document.createElement("code");
        if(this.myMos.stepFunc) {
            codeElem.innerHTML = this.myMos.stepFunc.toString();
        } else {
            codeElem.innerHTML = 
            `
// Note that this is a function of 'absolute' time,
// not delta-time
function displacement(t, amplitude, k, m) {
    const phase = Math.PI / 2;
    const freq = Math.sqrt(k / m);
    return amplitude * Math.sin(freq * t + phase);
}
            `;
        }
        div.appendChild(codeElem);

        return div;
    }

    private createStatsTable(): HTMLElement {
        let table = document.createElement("table");
        table.className = "statTable";
        table.id = this.getTableName();
        
        let offsetRow = document.createElement("tr");
        let offsetLab = document.createElement("td");
        offsetLab.innerHTML = "Offset:";
        let offsetDat = document.createElement("td");
        offsetDat.innerHTML = "...";
        offsetRow.appendChild(offsetLab);
        offsetRow.appendChild(offsetDat);
        table.appendChild(offsetRow);
        return table;
    }

    private getTableName(): string {
        return "MOSStatTable " + this.id;
    }

    draw() {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const center_x = this.canvas.width / 2;
        const mass_x = center_x + this.myMos.x;

        ctx.beginPath();
        ctx.strokeStyle = "#666666";
        ctx.moveTo(0, this.drawHeight);
        ctx.lineTo(mass_x, this.drawHeight);
        ctx.stroke();

        ctx.strokeStyle = "green";
        for(let i = -1; i <= 1; i += 2) {
            ctx.beginPath();
            const x = center_x + i*(this.myMos.getAmplitude() + this.drawRadius);
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.canvas.height);
            ctx.stroke();
        }

        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(mass_x, this.drawHeight, this.drawRadius, 0, Math.PI * 2, false);
        ctx.fill();

        this.updateStatsTable();
    }

    private updateStatsTable() {
        let offsetDat = document.getElementById(this.getTableName()).children[0].children[1];
        let xs = '' + this.myMos.x;
        if(this.myMos.x >= 0) {
            if(this.myMos.x < 100) {
                xs = "+" + xs;
            }
            xs = " " + xs;
        } else {
            if(this.myMos.x > -100) {
                xs = xs.substring(0, 1) + "0" + xs.substring(1);
            }
        }
        offsetDat.innerHTML = xs;
    }
}