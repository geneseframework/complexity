
const useRequestHook = () => {
    useRequest(getMenuItems, (data) => {
        setMenuItems(Object.values(data));
    });
}
// const simpleReactComponent = () => {
//     const arrow = () => {
//         let b = 3;
//     }
// }
