# <u>**Bot des 1eC**</u>
> Bienvenue sur la page de présentation du robot discord des 1C.
> 
> Sur cette présentation, vous apprendrez:
> - Comment coder en python directement sur discord
> - Comment acceder à votre espace ecoleDirecte directement sur discord
>
> Si vous faites partie des [admins](#admins), vous aurez également accès à [ces commandes](#commandes-admins).
> 
> Vous pourrez ajouter le bot en suivant [ces instructions](#ajouter-le-robot).

## **Coder en python ?**
Grâce à ce robot vous pourrez désormais coder en python directement sur discord (elle est pas belle la vie ?) !
Pour cela vous devrez tous d'abord créer un bock de code via discord comme dans l'exemple ci-dessous:
![Tuto python #1](https://cdn.discordapp.com/attachments/888478345229139980/888478384261324880/python_tuto_0.png)

Envoyez ensuite ce code dans un salon textuel, faites clique droit sur le message que vous venez d'envoyer puis appuyez sur "Répondre" (si vous êtes sur mobile, laissez votre doigt appuyé sur votre message).

Quand vous aurez fait cette étape, il ne vous restera plus qu'à taper la commande `1c.python` et d'envoyer votre message.
![Tuto python #2](https://cdn.discordapp.com/attachments/888478345229139980/888478385792241684/python_tuto_1.png)

Le bot ajoutera une réaction à votre message pour vous informer que votre code est en train de tourner. Quand il aura terminé, il supprimera cette réaction et vous envera le contenu de la console.

## **Ecole directe sur discord ?**
Et oui! Plus besoin de vous compliquer la vie à aller sur google pour tout le temps vous re-connecter: désormais, la liste des devoirs est accecible sur discord, tout comme les messages informatifs et bientôt vos notes!

Tout d'abord affichez la liste des commandes disponibles avec la commande `1c.ecoleDirecte`. Vous verez que pour lier votre compte à discord il faut utiliser la commande `1c.ecoleDirecte login`.
> ### <u>Se connecter à ecoleDirecte</u>
> Quand vous aurez executé la commande `1c.ecoleDirecte login`, le bot vous redirigera vers vos messages privé (dans les prochaines étapes vous allez vous connecter avec votre identifiant et votre mot de passe: ce serai dommage de les montrer à tout le monde).
> 
> Clickez sur le lien que le robot vous a donné (accecible uniquement par vous) et suivez les informations du robot.
> Quand vous serez connecté, il vous enverra un lien pour retourné au salon sur lequel vous avez executé la commande.
> > #### ***Problèmes de connection:***
> > Si vous rencontrez des problèmes pour vous connecter, faites-le moi savoir avec la commande `1c.report` suivie de votre message.

> ### <u>Les commandes</u>
> Une fois connecté, vous aurez accès à plusieurs commandes:
> |Commandes|Fonctions|
> |:-------:|:-------:|
> |`1c.ecoleDirecte account`|Affiche les informations de ton compte|
> |`1c.ecoleDirecte devoirs`|Affiche ton cahier de texte|
> |`1c.ecoleDirecte messages`|Affiche les messages envoyé par l'établissement|
> |`1c.ecoleDirecte notes`|Affiche les notes de tes contrôles|
> |`1c.ecoleDirecte logout`|Permet de te déconnecter de ton compte ecoleDirecte|

## **Autres fonctionnalitées:**
|Commandes|Fonctions|
|:-------:|:-------:|
|`1c.help`|Affiche la liste des commandes disponible|
|`1c.ping`|Affiche la latence du robot|
|`1c.report`|Permet de me faire part d'un commentaire, d'un bug ou d'un problème de compte ecoleDirecte|

## **Admins:**
Afin de ne pas laisser le robot sans surveillance, j'ai défini des "admins". Chaques professeurs est automatiquement définie en tant qu'admin. Ces derniers ont accès à des commandes plus poussé qu'un utilisateur normal.

### _Commandes admins_:
|Commandes|Fonctions|
|:-------:|:-------:|
|`1c.ecoleDirecte removeAccount`|Permet de forcer la déconnection d'un compte ecoleDirecte à un utilisateur discord|
|`1c.stop`|Permet de déconnecter le robot (utiliser uniquement en cas d'urgence)|

## **Ajouter le robot:**
Pour ajouter le robot sur votre server il vous suffira de:
1. Clicker sur [ce lien](https://discord.com/api/oauth2/authorize?client_id=887684698988478525&permissions=0&scope=applications.commands%20bot), qui vous redirigera vers une page discord.
    - Notez que devrez vous connecter pour ajouter le robot sur votre serveur.
    - De plus, vous ne pourrez pas ajouter le robot si n'avez pas accès à la permissions `MANAGE_GUILD` de discord.
2. Selectionnez votre serveur dans la liste proposé par discord (cliquez sur "Séléctionner un serveur")
    - Si votre serveur n'apparait pas dans la liste, c'est que vous ne possédez pas la permission `MANAGE_GUILD` sur ce serveur.
3. Clickez sur "Autoriser" (bouton bleu en bas de la fenêtre).

Et voilà! Il est sur votre serveur! Veillez à ne pas lui enlever la permission `ADMINISTRATOR` pour veiller à son bon fonctionnement.
> Note: Si vous possédez la permission `ADMINISTRATOR` sur votre serveur, ou que vous en êtes le propriétaire, la permission `MANAGE_GUILD` ne sera pas nécéssaire pour ajouter le robot sur votre serveur.