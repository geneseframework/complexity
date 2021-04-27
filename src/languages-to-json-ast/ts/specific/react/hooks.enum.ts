export enum ReactHook {
    USE_ACTIONS = 'useActions',
    USE_CALLBACK = 'useCallback',
    USE_CONTEXT = 'useContext',
    USE_DEBUG_VALUE = 'useDebugValue',
    USE_DISPATCH = 'useDispatch',
    USE_EFFECT = 'useEffect',
    USE_HEADER = 'useHeader',
    USE_IMPERATIVE_HANDLE = 'useImperativeHandle',
    USE_LAYOUT_EFFECT = 'useLayoutEffect',
    USE_MEMO = 'useMemo',
    USE_NAV_BAR = 'useNavBar',
    USE_REDUCER = 'useReducer',
    USE_REF = 'useRef',
    USE_REQUEST = 'useRequest',
    USE_SELECTOR = 'useSelector',
    USE_SHALLOW_EQUAL_SELECTOR = 'useShallowEqualSelector',
    USE_STATE = 'useState',
    USE_STORE = 'useStore'
}

export function isReactHook(name: string): name is ReactHook {
    return Object.values(ReactHook).includes(name as ReactHook);
}
