import element from '@utils/element'

const body = document.querySelector('body')

const grid = element.createTemplate(`x
    <div am-container="grid">
        <h2>Grid</h2>
        <div am-grid="container" spacing="2">
            <div am-grid="item" elg="3" md="6" sm="12" spacing="1">1 колонка</div>
            <div am-grid="item" elg="3" md="6" sm="12" spacing="1">2 колонка</div>
            <div am-grid="item" elg="3" md="6" sm="12" spacing="1">3 колонка</div>
            <div am-grid="item" elg="3" md="6" sm="12" spacing="1">4 колонка</div>
        </div>
    </div>
`)


body.appendChild(grid)