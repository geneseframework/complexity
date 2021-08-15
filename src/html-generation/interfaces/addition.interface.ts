/**
 * Interface for objects which can be added to others, like RepartitionByStatus or ComplexitiesByStatus
 */
export interface Addition<T> {

    add: (element: T) => T;     // The addition method

}
