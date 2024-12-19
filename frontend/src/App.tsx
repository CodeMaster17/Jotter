import './App.css';
import Extension from '../../extension/src/pages/Extension';
function App() {

  return (
    <>
      <Extension />
    </>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Extension />} />
    //     <Route path="/dashboard" element={<DashboardLayout />}>
    //       <Route path="/dashboard/home" element={<DashboardHome />} />
    //     </Route>
    //   </Routes>
    // </Router>
  )
}

export default App
