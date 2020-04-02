const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');


function renderCafeList(doc) {

    const li = document.createElement('li');
    const name = document.createElement('span');
    const city = document.createElement('city');
    const cross = document.createElement('div')

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'X'

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);


    //deleting data from db
    cross.addEventListener('click', e => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
    
}


//getting data from db
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafeList(doc);
    })
})

//saving data to db
form.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    })
    form.name.value = '';
    form.city.value = '';
})