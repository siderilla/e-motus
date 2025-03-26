import Motus from "../model/motus";
import MotusService from "../services/motus-service";
import MotusCard from "./motus-card";

export default class MotusList extends HTMLElement {

    service: MotusService;
    moti: Motus[];

    constructor() {
        super()
        this.attachShadow({mode: 'open'});
        this.service = new MotusService();
        this.moti = [];
    }

    async connectedCallback(){

        this.moti = await this.service.loadMoti();
        this.styling()
        this.render()
    }


    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .grid{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 16px;
            }
            .add-btn{
                position: absolute;
                bottom: 12px;
                right: 12px;
                height: 64px;
                width: 64px;
                border-radius: 32px;
                border: none;
                font-size: 30px;
                background-color: lightpink;
                
            }    
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){

        let container = this.shadowRoot!.getElementById("container");
        if (container){
            container.innerHTML='';
        } else {
            container = document.createElement('div');
            /*  container.setAttribute('id', 'container'); */
            container.id = "container"
            this.shadowRoot!.appendChild(container);
        }
        
        
        const main = document.createElement('div');
        main.classList.add('grid')
    
        for (let i = 0; i  < this.moti.length; i++) {
            const motus = this.moti[i];
            const card: MotusCard = document.createElement('motus-card') as MotusCard;
            card.setAttribute("selected-motus", JSON.stringify(motus))
            main.appendChild(card)
        }

        container.appendChild(main)

        const addBtn = document.createElement("button");
        addBtn.classList.add("add-btn");
        addBtn.appendChild(document.createTextNode("➕"));
        addBtn.addEventListener('click', () => this.addRandomMotus())
        container.appendChild(addBtn);
    }

    addRandomMotus() {
        const randomMotus: Motus = {
            id: Math.random().toString(36).substring(2, 15),
            value: Math.floor(Math.random() * 5),
            note: `Nota casuale ${Math.random().toString(36).substring(7)}`,
            creationDate: Date.now(),
            location: {
                lat: 44.40946225320591 + Math.random() * 0.01,
                lng: 8.934506010533006 + Math.random() * 0.01
            }
        };
    
        this.moti.push(randomMotus);
    
        this.render();
    }

    

}


customElements.define('motus-list', MotusList)
