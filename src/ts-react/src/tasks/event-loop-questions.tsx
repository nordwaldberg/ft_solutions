import React from 'react';

// В StrictMode вывод будет дублироваться!
// В режиме Strict Mode (который включен по умолчанию в React приложениях, начиная с React 18)
// React двойной рендерит компоненты в процессе разработки, чтобы выявить потенциальные проблемы.

interface C1Props {
    children?: React.ReactNode;
}

const C1v1: React.FC<C1Props> = ({children}) => {
    console.log('R1');

    React.useEffect(() => {
        console.log('R2');
    });

    return (
        <>
            {children}
        </>
    );
};

const C2v1: React.FC = () => {
    console.log('R3');

    React.useEffect(() => {
        console.log('R4');
    });

    return (
        <>
            'MWA-HA-HA!'
        </>
    );
};


// R1 R3 R2 R4

// Выполнение useEffect:
// По ходу выполнения они добавляются в очередь эффектов.
// После завершения фазы рендера React вызывает эффекты в порядке дерева компонентов.
// Сначала вызываются эффекты родительских компонентов, затем дочерних.
// Это гарантирует, что родительский эффект выполнится перед дочерним, если они зависят друг от друга.



 const C1v2: React.FC<C1Props> = ({children}) => {
    console.log('R1');

    React.useEffect(() => {
        console.log('R2');
    });

    return (
        <div
            ref={element => console.log('R5', element?.innerHTML)}
        >
            {children}
        </div>
    );
};

const C2v2: React.FC = () => {
    console.log('R3');

    React.useEffect(() => {
        console.log('R4');
    });

    return (
        <>
            'MWA-HA-HA!'
        </>
    );
};

//  R1 R3 R5 MWA-HA-HA! R2 R4

// Рефы обрабатываются после завершения рендера, но перед выполнением useEffect, поэтому R5 появится раньше R2
// Это связано с тем, что эффекты могут зависеть от наличия готового DOM-элемента,
// связанного с рефом. Поэтому React обрабатывает рефы перед вызовом useEffect.

// element?.innerHTML - будет содержать HTML-строку,
// которая представляет дочерние элементы этого <div> на момент вызова реф-коллбэка.
// На момент вызова рефа дочерние компоненты (C2) уже будут отрендерены, поэтому innerHTML будет включать содержимое компонента C2.
// Компонент C2 возвращает текст 'MWA-HA-HA!'. Поэтому содержимое innerHTML элемента <div> будет 'MWA-HA-HA!';

const V1: React.FC = () => {
    return (
        <C1v1><C2v1/></C1v1>
    );
};
const V2: React.FC = () => {
    return (
        <C1v2><C2v2/></C1v2>
    );
};

export {
    V1,
    V2,
}