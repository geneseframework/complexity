import React from 'react';

const Component = () => {
    return (
        <div>
            <p>Some text</p>
        </div>
    )
}

export const OtherComponent = () => {
    return (
        <div>
            <p>Some other text</p>
        </div>
    )
}

const ComponentDisplay: React.FC<any> = (display: boolean) => {
    return (
        <>
            {display && (
                <div>
                    <p>Some text</p>
                </div>
            )}
        </>
    );
};
