'use strict';

class Dialogue
{
    constructor(dialoguefile_name)
    {
        this.dialoguefile_name = dialoguefile_name;
        this.steps = [];

        this.steps.push(new DialogueStep());

        this.step_id = 0;

        this.addStep = this.addStep.bind(this);
        this.makeChoice = this.makeChoice.bind(this);
        this.setStart = this.setStart.bind(this);
        this.update = this.update.bind(this);
    }

    addStep(new_step)
    {
        this.steps.push(new_step);
    }

    makeChoice(new_step_id)
    {
        this.step_id = new_step_id;
        console.log("Choice made : " + new_step_id);

        setInterval(this.update(), 200);
    }

    setStart(start_step_id)
    {
        this.step_id = start_step_id;
    }

    update()
    {
        // shows the updated dialogue
        console.log("Step : " + this.step_id);

        let dialogue = 
            <div>
                <div>{this.steps[this.step_id].texte}</div>
                <div>
                    <div><button onClick={this.makeChoice.bind(this, this.steps[this.step_id].choices[0].leads_to)}>{this.steps[this.step_id].choices[0].texte}</button></div>
                    <div><button onClick={this.makeChoice.bind(this, this.steps[this.step_id].choices[1].leads_to)}>{this.steps[this.step_id].choices[1].texte}</button></div>
                    <div><button onClick={this.makeChoice.bind(this, this.steps[this.step_id].choices[2].leads_to)}>{this.steps[this.step_id].choices[2].texte}</button></div>
                    <div><button onClick={this.makeChoice.bind(this, this.steps[this.step_id].choices[3].leads_to)}>{this.steps[this.step_id].choices[3].texte}</button></div>
                </div>
            </div>;
        ReactDOM.render(dialogue, document.getElementById('dialogue'));
    }
}

class DialogueStep
{
    constructor()
    {
        this.nb_choices = 4;

        this.texte = "DialogueStep";
        
        this.choices =  [{leads_to: 0, texte: "Choice1"},
                        {leads_to: 0, texte: "Choice2"},
                        {leads_to: 0, texte: "Choice3"},
                        {leads_to: 0, texte: "Choice4"}];

        this.setTexte = this.setTexte.bind(this);
        this.setChoice = this.setChoice.bind(this);
        this.setNbChoices = this.setNbChoices.bind(this);
    }

    setTexte(texte)
    {
        this.texte = texte;
    }

    setChoice(id_choice, choice)
    {
        this.choices[id_choice] = choice;
    }

    setNbChoices(nb_choices)
    {
        this.nb_choices = nb_choices;
    }
}

let root = document.getElementById('root');

var step1 = new DialogueStep();
step1.setTexte("Hello !");
step1.setChoice(0, {leads_to: 2, texte: "Hello !"});
step1.setChoice(1, {leads_to: 3, texte: "Go to hell !"});
step1.setChoice(2, {leads_to: 4, texte: "I'm hungry !"});
step1.setChoice(3, {leads_to: 4, texte: "I'm hungry !"});
step1.setNbChoices(4);

var step2 = new DialogueStep();
step2.setTexte("Where are you headed, little pal ?");
step2.setChoice(0, {leads_to: 1, texte: "I am travelling to the Great Tree !"});
step2.setChoice(1, {leads_to: 1, texte: "Why should I tell you ?"});
step2.setChoice(2, {leads_to: 4, texte: "I'm soo hungry !"});
step2.setChoice(3, {leads_to: 4, texte: "I'm soo hungry !"});
step2.setNbChoices(4);

var step3 = new DialogueStep();
step3.setTexte("Pardon me !!");
step3.setChoice(0, {leads_to: 1, texte: "I stand by my words !"});
step3.setChoice(1, {leads_to: 1, texte: "Sorry about that..."});
step3.setChoice(2, {leads_to: 4, texte: "I'm soooooooooo hungry !"});
step3.setChoice(3, {leads_to: 4, texte: "I'm soooooooooohungry !"});
step3.setNbChoices(4);

var step4 = new DialogueStep();
step4.setTexte("Lastly finding food has indeed proved to be more and more of a challenge.");
step4.setChoice(0, {leads_to: 1, texte: "Where am I ?"});
step4.setChoice(1, {leads_to: 4, texte: "I'm hungry !"});
step4.setChoice(2, {leads_to: 4, texte: "I'm hungry..."});
step4.setChoice(3, {leads_to: 4, texte: "I'm hungry ?"});
step4.setNbChoices(4);

var dia = new Dialogue("defaultdialogue.txt");
dia.addStep(step1);
dia.addStep(step2);
dia.addStep(step3);
dia.addStep(step4);
dia.setStart(1);

//ReactDOM.render(<button onClick={changeState}>Activate</button>, root);

dia.update();


class Choice extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {leads_to: 0, texte: ""};
    
        this.render = this.render.bind(this);
    }

    render()
    {
        return (
            <button>Choice</button>
        );
    }
}

// the subapp that presents the player with a set of choices to influence the story
class Choices extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {choices : []};

        this.makeChoice = this.makeChoice.bind(this);
        this.render = this.render.bind(this);
    }

    makeChoice(id)
    {
        console.log("Making a choice : " + id);
    }

    render()
    {
        let listChoices = this.state.choices.map((choice) => <div>{choice}</div>);

        return (
            <div>
                {listChoices}
            </div>
        );
    }
}

ReactDOM.render(<Choices />, document.getElementById("choices"));