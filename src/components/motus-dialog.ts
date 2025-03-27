import Motus from "../model/motus";

export default class MotusDialog extends HTMLElement {

    dialog!: HTMLDialogElement;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.styling();
        this.render();
    }

    styling() {
        const style = document.createElement('style');
        style.innerText = `
 
        `
        this.shadowRoot!.appendChild(style);
    }

    render() {
        this.dialog = document.createElement("dialog");
        this.dialog.id = "new-motus";
        this.dialog.innerHTML = `
            <form id="motus-form"> 
                <label for="crying">😭</label>
                <input type="radio" name="motusValue" id="crying" value="0">
                <label for="sad">😥</label>
                <input type="radio" name="motusValue" id="sad" value="1">
                <label for="neutral">😐</label>
                <input type="radio" name="motusValue" id="neutral" value="2">
                <label for="happy">🙂</label>
                <input type="radio" name="motusValue" id="happy" value="3">
                <label for="euphoric">😁</label>
                <input type="radio" name="motusValue" id="euphoric" value="4">
                <label for="note">Come ti senti?</label>
                <textarea name="note" id="note"></textarea>
            </form>
        `

        const cancelBtn = document.createElement("button");
        cancelBtn.appendChild(document.createTextNode('cancella'));
        cancelBtn.addEventListener('click', () => {
            this.clearForm()
            this.dialog.close()
        });
        this.dialog.appendChild(cancelBtn);

        const okBtn = document.createElement("button");
        okBtn.appendChild(document.createTextNode('ok'));
        okBtn.addEventListener('click', () => {
            this.dispatchMotus();
            this.clearForm()
            this.dialog.close();
        });
        this.dialog.appendChild(okBtn);

        this.shadowRoot!.appendChild(this.dialog);
    }

    dispatchMotus() {
        const form = this.shadowRoot!.getElementById('motus-form') as HTMLFormElement;
        const data = new FormData(form);
        const timeStamp = new Date().getTime()
        const newMotus: Motus = {
            id: 'user1-' + timeStamp,
            value: parseInt(data.get('motusValue') as string),
            creationDate: timeStamp,
            note: data.get('note') as string
        }
        const event = new CustomEvent('motus-created', {detail: newMotus});

        this.dispatchEvent(event);

    }

    clearForm() {
        const form = this.shadowRoot!.getElementById('motus-form') as HTMLFormElement;
        form.reset()
    }

    openMe() {
        this.dialog.showModal();
    }

}

customElements.define('motus-dialog', MotusDialog)