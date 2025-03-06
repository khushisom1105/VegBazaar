const PrivacyPolicy = () => {
    const sections = [
      {
        title: "Who We Are",
        content: "Habitasse mauris lectus commodo semper posuere aliquam quis habitasse."
      },
      {
        title: "Comments",
        content: `Odio vestibulum malesuada semper turpis et libero. Amet diam sollicitudin libero arcu dui.
                  Posuere tellus scelerisque amet arcu pulvinar dignissim pharetra rhoncus urna. Ac vel
                  volutpat nunc at egestas. Vel in enim viverra amet eget sit amet orci.`
      },
      {
        title: "Media",
        content: `Convallis eu nulla cras adipiscing. Auctor mi scelerisque velit gravida purus diam.`
      },
      {
        title: "Cookies",
        content: `Lorem ipsum dolor sit amet consectetur. Id nascetur dolor in cursus sollicitudin semper cursus morbi.`
      },
      {
        title: "Embedded content from other websites",
        content: `Nulla et consequat vitae sit diam purus. Etiam sapien sit commodo lacus. Viverra fusce enim at id.`
      },
      {
        title: "Who we share your data with",
        content: `Platea praesent non consectetur mauris sollicitudin. Pharetra risus ac tortor risus aenean hac dictumst quis.`
      },
      {
        title: "What rights you have over your data",
        content: `Lorem ipsum dolor sit amet consectetur. Aliquet luctus etiam tortor purus molestie tempor quam nec.`
      }
    ];
  
    return (
      <div className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold text-gray-800">{section.title}</h5>
                <p className="text-gray-600 mt-2">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;