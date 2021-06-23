// Materialize Sidenav
const elem = document.querySelector('.sidenav');
const instance = M.Sidenav.init(elem, {
  inDuration: 350,
  outDuration: 350,
  edege: 'left'
});

// Materialize select form
const elems = document.querySelectorAll('select');
const instances = M.FormSelect.init(elems, {
  classess: 'public'
});

// Using ckeditor
const body1 = document.querySelector('.body1')
body1 ? CKEDITOR.replace('body1') : null

