// src/AnimatedView.js

import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AnimatedView = ({ value }) => {
    const views = {
        "item-1": <div className="view view1">View 1</div>,
        "item-2": <div className="view view2">View 2</div>,
        "item-3": <div className="view view3">View 3</div>
    };

    return (
        <TransitionGroup>
            <CSSTransition
                key={value}
                timeout={300}
                classNames="fade"
                
            >
                <div>
                    {views[value] || null}
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default AnimatedView;
