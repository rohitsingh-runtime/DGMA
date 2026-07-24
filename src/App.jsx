import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Hero from "./components/Hero";
import Initiatives from "./components/Initiatives";
import FeaturedModules from "./components/Featured-modules";
import FeaturedStories from "./components/Featured-stories";
import MaritimeMapBanner from "./components/Maritime-map";
import StoryHub from "./pages/StoryHub";
import Shipping from "./components/Shipping";
import Shipbuilding from "./pages/Shipbuilding";
import MaritimeLeadership from "./pages/MaritimeLeadership";
import KnowledgeHub from "./pages/KnowledgeHub";
import MediaCentre from "./pages/MediaCentre";
import UniversalSearch from "./pages/UniversalSearch";
import IndiaMap from "./pages/IndiaMap";
import AiAssistant from "./pages/AiAssistant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            index
            element={
              <>
                <Hero />
                <Initiatives />
                <FeaturedModules />
                <FeaturedStories />
                <MaritimeMapBanner />
              </>
            }
          />

          <Route path="/ship-recycling" element={<Shipping />} />
          <Route path="/shipbuilding" element={<Shipbuilding />} />
          <Route path="/stories" element={<StoryHub />} />
          <Route path="/maritime-leadership" element={<MaritimeLeadership />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          <Route path="/media-centre" element={<MediaCentre />} />
          <Route path="/search" element={<UniversalSearch />} />
          <Route path="/india-map" element={<IndiaMap />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
