# 1.0.0
- Ajout de toutes les commandes de base:
  - help
  - ping
  - stop
  - python
  - ecoleDirecte

# 1.1.0
- Ajout des "slash commands" de discord (bêta):
  - Appuyez sur "/" pour acceder à la liste des commandes
- Ajout de commande:
  - report
  - stop

# 1.2.0
- Optimisation de commandes:
  - python
  - ping
  - ecoleDirecte
  - report

# 1.2.1
- Ajout de fonctionnalité:
  - ecoleDirecte: sous-commande "notes" ajouté

# 1.3.0
- Fix de bugs:
  - ecoleDirecte: crash du robot lors de la sous-command "login"
- Ajout de fonctionnalité
  - ecoleDirecte: sous-commande "notes": affichage des moyennes
  - report: ne requière que désormais 10 charactères pour être validé

# 1.3.1
- Fix de bugs:
  - ecoleDirecte: 
    > notes: Affiche "NaN" (=Not A Number) sur certaine notes (et donc la moyenne n'était pas disponible)
    > mails: Trop de mail= plantage du bot + affiche uniquement les mails non lu