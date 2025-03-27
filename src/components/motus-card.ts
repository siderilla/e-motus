import Motus from "../model/motus";

export default class MotusCard extends HTMLElement{

    motus!: Motus;

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }


    // get motus():Motus{
    //     return JSON.parse(this.getAttribute("selected-motus")!);

    //    /*  const motusStr = this.getAttribute('selected-motus');
    //     if (motusStr) {
    //         return JSON.parse(motusStr);
    //     }
    //     return null; */
    // }

    connectedCallback(){
        console.log('pippo')
        this.styling();
        this.render()
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .card{
                border-radius: 8px;
                box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.2);
                display: flex;
            }
            .emoticon{
                font-size: 60px;
                text-align: center;
                padding: 16px 0px;
                width: 84px;
            }
            .info-container{
                justify-content: space-around;
                display: flex;
                flex-direction:column;
                width:100%
            }  
            .controls-container{
                display: flex;
                justify-content: flex-end;
            }
            .btn{
                background-color: white;
                border: none;
                font-size: 20px;
                padding: 0px 8px;
            }
            .note{
                font-size: 0.7em;
                padding: 2px;
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('card');
        mainDiv.innerHTML = `
            <span class="emoticon"> 
	            ${this.fromValueToEmoji(this.motus.value)}
            </span>
            <div class="info-container">
                <span>
                    ${this.fromTimeStampToDateString(this.motus.creationDate)}
                </span>
                <span class="note">
                     ${this.motus.note}
                </span>
                <div class="controls-container">
                    <button class="btn">✕</button>
                </div>
            </div>
        `;
        this.shadowRoot!.appendChild(mainDiv);
    }

    fromValueToEmoji(value: number){
        switch (value) {
            case 0: 
                return '😭';
            case 1: 
                return '😥';
            case 2: 
                return '😐';
            case 3: 
                return '🙂';   
            default:
                return '😁';
        }
    }

    fromTimeStampToDateString(timeStamp: number){
        const date = new Date(timeStamp);
        return date.toDateString() + ' - ' + date.toLocaleTimeString();
    }

}


customElements.define('motus-card', MotusCard)