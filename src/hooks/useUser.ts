import { usePbStore } from '../lib/pbStore';

const useUser = () => usePbStore((state) => state.user);

export default useUser;
