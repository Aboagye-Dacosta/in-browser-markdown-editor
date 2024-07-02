import RootLayout from "./features/root/RootLayout";
import { useAppSelector } from "./store/hooks";
import { getLifecycle } from "./store/slice/appStateSlice";
import EditorPage from "./views/EditorPage";
import HomePage from "./views/HomePage";

export default function App() {
  const lifecycleState = useAppSelector(getLifecycle);
  return (
    <RootLayout>
      {lifecycleState === "initial" && <HomePage />}
      {lifecycleState === "active" && <EditorPage />}
    </RootLayout>
  );
}
