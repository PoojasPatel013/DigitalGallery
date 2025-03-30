import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs"

const TabExample = () => {
  return (
    <Tabs defaultValue="gallery" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="collections">Collections</TabsTrigger>
        <TabsTrigger value="artists">Artists</TabsTrigger>
      </TabsList>
      <TabsContent value="gallery" className="p-4">
        <h2 className="text-2xl font-bold mb-4">Featured Artworks</h2>
        <p>Here you can display a grid or list of featured artworks.</p>
      </TabsContent>
      <TabsContent value="collections" className="p-4">
        <h2 className="text-2xl font-bold mb-4">Art Collections</h2>
        <p>Display various art collections or categories here.</p>
      </TabsContent>
      <TabsContent value="artists" className="p-4">
        <h2 className="text-2xl font-bold mb-4">Featured Artists</h2>
        <p>Showcase profiles of featured artists in this tab.</p>
      </TabsContent>
    </Tabs>
  )
}

export default TabExample

