import { api } from "./lib/hono";

function App() {
  const handleApi = async () => {
    try {
      const res = await api.auth.login.$post();

      if (res.ok) {
        const data = await res.json();
        console.log(data.asdasdasdxcvxcv);
      }

      if (res.status === 201) {
        const data = await res.json();

        console.log(data.asdasdasdxcvxcv);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleApi}>Test honoe</button>
      </div>
    </>
  );
}

export default App;
