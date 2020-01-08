/**
 * React.Dispatchのラッパー
 * ラップするときはどうせどっちかでしか使わないのでどっちかで動くようにする
 */
interface MyDispatch<T> {
    Set: React.Dispatch<T>;
    Reset: React.Dispatch<(prevState: T) => void>
}
export default MyDispatch;