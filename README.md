# Mozaïk Gitlab widgets

## Gitlab — Commits

> Présente les 5 derniers commits du projet sous forme de table

### parameters

key        | required | description
-----------|----------|----------------------------------------------------
`title`    | no       | *Title of the widget*
`url`      | no       | *URL de l'hôte Gitlab*
`project`  | no       | *Numero du projet dans Gitlab*

### usage

```javascript
{
  type: 'gitlab.commits',
  title : "Commit",
  url : "http://domain.com/gitlab",
  project : 2,
  columns: 4, rows: 1,
  x: 0, y: 2
}
```