const GOOD_GUY = 0;
const BAD_GUY = 1;
const NEUTRAL_GUY = 2;
const ALONE_GUY = 3;

const cards = [
    {
        "id": 1,
        "role": "Chien perdu",
        "description": "Chaque nuit, le chien perdu emmène une personne dans la forêt pour l'attacher à un arbre et le tuer...",
        "skills" : {"pros" : [{"libelle" : "Vote pour attacher une personne toutes les nuits", "when" : "night", "cooldown" : 0, "nbUse" : 0}], "cons" : []},
        "side" : BAD_GUY
    },
    {
        "id": 2,
        "role": "Taxidermiste",
        "description": " Le taxidermiste peut empailler une personne précédemment tuer et  s’en servir comme appât la nuit. (le joueur empailler n’as pas le droit de parler et est le seul avec le taxidermiste a savoir qu’il est empailler). <br> Si le taxidermiste est visé alors qu’il a empaillé un joueur, le joueur lui sert de bouclier pour la nuit. <br> Si le taxidermiste n’a pas été attaqués la nuit suivant l’empaillement. Le joueur empailler reviens à la vie avec ces pouvoir. (Si pouvoir unique déjà utilisé, alors il revient sans pouvoir) Une fois la personne revenu à la vie, le taxidermiste n’as plus de bouclier la nuit.",
        "skills" : {"pros" : [{"libelle" : "Peut empailler une personne morte précèdement, elle reviendra à la vie deux nuit plus tard.", "when" : "night", "cooldown" : -1, "nbUse" : 1}, {"libelle" : "La personne empailler protège le taxidermiste des attaques pendant deux nuits.", "when" : "night", "cooldown" : 0, "nbUse", 0}], "cons" : []},
        "side" : GOOD_GUY
    },
    {
        "id": 3,
        "role": "Pisteur des montagnes",
        "description": "Le pisteur peut suivre les traces de n'importe qui à la tomber de la nuit. <br> Si la personne suivi a été précédemment attachée dans la forêt par les chiens perdus elle est détachée et survit à la nuit. <br> Si le pisteur suit une personne qui n'est pas capturé, il découvre sa carte.",
        "skills" : {"pros" : [{"libelle" : "Piste un habitant la nuit : si l'habitant est attaché alors il le libère, sinon il découvre son rôle.", "when": "night", "cooldown" : 0, "nbUse" : 0}], "cons" : ["libelle" : "Si l'habitant étais un chien perdu, alors le pisteur meurt sur le coup. Ne sauve pas les victimes de Jack l'Égorgeur."]},
        "side" : GOOD_GUY
    },
    {
        "id": 4,
        "role": "Le Maire de Black Lake City",
        "description": "Le Maire aura toujours le dernier mots, si les habitants ne s’entendent pas il devra départager les votes.  En cas d'égalité en cas de vote le maire devra désigner une personne qui devra mourir parmis ceux qui ont le même nombre de votes sur eux. Quand il se fait tuer il désigne un adjoint qui héritera de sa responsabilité. le maire peut se cacher tant qu'il n'y a pas d'égaliter des votes.",
        "skills" : {"pros" : [{"libelle" : "Choisis qui va mourir en cas d'égaliter. Lorsqu'il meurt désigne un bras droit à sa place.", "when" : "day", "cooldown" : 0, "nbUse" : 0}], "cons" : []},
        "side" : GOOD_GUY
    },
    {
        "id": 5,
        "role": "Prêtre",
        "description": "Il a la fâcheuse tendance à former des couple jusqu'à que la mort les sépare. Il choisit deux personne qui serons lié par le mariage, lorsque l'un des deux meurt le survivant prend le rôle  de la personne avec qui il était en couple. Si la personne étais chien perdu, alors le survivant devient chien perdu à son tour et doit tuer les habitant. à l’inverse si un chien perdu étais avec un habitant, et que l’habitant meurt, le chiens perdu deviens un habitant et récupère les pouvoir de son compagnon. Les pouvoirs sont remplacé et ne se cumule pas. La nuit il peut mettre sa foi à l'épreuve et prier pour se protéger des chiens.",
        "skills" : {"pros" : [{"libelle" : "Unis deux personnes, quand l'un meurt l'autre échange son pouvoir avec le défunt.", "when" : "night", "cooldown" : 0, "nbUse" : 1}, {"libelle" : "Prie pendant la nuit pour se protéger d'une attaque.", "when" : "night", "cooldown" : 0, "nbUse" : 2}], "cons" : []},
        "side" : GOOD_GUY
    },
    {
        "id": 6,
        "role": "Geek",
        "description": "Le/la geek est ultra connectée et elle a l'habitude des nuits blanches. Lorsque la nuit tombe il/elle peut choisir de faire une nuit blanche en programment et en jouant toute la nuit. Enfermée dans sa chambre, elle devient inatteignable pour les/le chien(s) perdu(s).La geek ne peut faire de nuit blanche qu'une seule fois toutes les deux nuit. Mais la geek est aussi une féru de gadget. Si elle est emmenée dans la forêt juste après une nuit blanche. Elle peut prendre en photo le chien perdu discrètement avant de mourir. Cette photo pourra être uniquement envoyée au pisteur des montagnes qui sera le seul à savoir exactement qui se cache derrière un des chiens perdu.",
        "skills" : {"pros" : [{"libelle" : "Peut se protéger pour une nuit.", "when" : "night", "cooldown" : 1, "nbUse" : 0}, {"libelle" : "Montre au pisteur un chien perdu lors de sa mort durant la nuit.", "when" : "night", "cooldown" : 0, "nbUse" : 0}], "cons" : ["libelle" : "Ne peut pas se protéger de Jack l'Égorgeur, ni dévoiler son identité."]},
        "side" : GOOD_GUY
    },
    {
        "id": 7,
        "role": "Sans-abri",
        "description": "Le sans-abris a eu une vie difficile.<br> Il se contente de ce qu'il trouve. Si il est tuer au premier tour par les chiens perdu, sa rancœur envers les humains le poussera a revenir se venger, il rejoindra donc les chiens. <br> Si il survit à la première nuit, il pourra durant le second tour choisir la maison d'un défunt. Le sans-abris aura la possibilité d'usurper l'identité de l'habitant et hérite donc de ses compétences.",
        "skills" : {"pros" : [{"libelle" : "Vole l'identité d'une personne morte.", "when" : "night", "cooldown" : 1, "nbUse" : 1}], "cons" : ["libelle" : "Trois nuit passé sans avoir trouvé de toit mène a la mort du sans abris."]},
        "side" : NEUTRAL_GUY
    },
    {
        "id": 8,
        "role": "Jack l'égorgeur",
        "description": "Jack est solitaire. Son but est de tuer quiconque se mettra sur sa route. <br> Chaque nuit il choisit une personne a tuer, son objectif est d'être le dernier en vie.",
        "skills" : {"pros" : [{"libelle" : "Choisit une personne à assassiné.", "when" : "night", "cooldown" : 1, "nbUse" : 0}], "cons" : ["libelle" : "Ne peut pas tuer de chien durant la nuit. Si il attaque le prêtre durant sa prière, Jack meurt."]},
        "side" : ALONE_GUY
    },
    {
        "id": 9,
        "role": "Le vétérinaire",
        "description": " Son objectif est de soigné les personne possédé par l’esprit des chien perdu, après quelque recherche, il a réussi à trouver une formule permettant de les libérer de leur emprise. Malheureusement ce remède est long est difficile a fabriquer. il n'en possède que quelque doses.",
        "skills" : {"pros" : [{"libelle" : "Choisis un habitant dans lequel injecté le remède.", "when" : "night", "cooldown" : 1, "nbUse" : 2}], "cons" : ["libelle" : "Si l'habitant n'es pas un chien alors la dose de remède est perdu."]},
        "side" : GOOD_GUY
    },
];

export default cards;
