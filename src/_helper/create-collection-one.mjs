import { createCidsFromPath } from "./create-cids-from-path.mjs"

export async function createCollectionOne() {

  const cids = await createCidsFromPath("/home/pnts/Downloads/compressed-nfts/")

  return [
    {
      ipfs_car: cids[0],
      price: "27,50",
      description: "Das Rot-weiße Muster verleiht dem Stück Lebensfreude. Das Kleidchen ist mit einer kleinen weißen Ente geschmückt. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Baumwolle"],
        pattern: "gestreift",
      }
    },
    {
      ipfs_car: cids[1],
      price: "43,70",
      description: "Das Design soll die Vielfalt des Lebens verdeutlichen. Dieses Kleidchen ist für luftige Sommertage gemacht. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "92",
        material: ["Baumwolle", "Seide", "Polyester"],
        pattern: "bunt",
      }
    },
    {
      ipfs_car: cids[2],
      price: "39,33",
      description: "Oben Bunt, unten Rot. Dieses Kleidchen ist für Frühlingsspaziergänge und rumtollen am Sonntag morgen gemacht. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Baumwolle"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[3],
      price: "22,45",
      description: "Das Design verkörpert die Schönheit der Natur. Dieses Kleidchen lässt die Trägerin zur Entdeckerin werden. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "86",
        material: ["Wolle"],
        pattern: "einfarbig",
      }
    },
    {
      ipfs_car: cids[4],
      price: "23,70",
      description: "Das karierte Design ist entspannend anzuschauen. Ein Kleidchen perfekt zum gemütlichen Mittagstee. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Wolle"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[5],
      price: "42,20",
      description: "Ein Design das Spaß macht! Ein Kleidchen für eine kleine Prinzessin zum wohlfühlen. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "80",
        material: ["Viskose"],
        pattern: "einfarbig",
      }
    },
    {
      ipfs_car: cids[6],
      price: "32,49",
      description: "Ein Design das zum Spielen designed wurde. Das Kleidchen eignet sich perfekt zum Draußen spielen. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "92",
        material: ["Wolle"],
        pattern: "einfarbig",
      }
    },
    {
      ipfs_car: cids[7],
      price: "28,65",
      description: "Das karierte Design ist entspannend anzuschauen. Ein Kleidchen perfekt zum gemütlichen Mittagstee. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "92",
        material: ["Wolle"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[8],
      price: "31,30",
      description: "Durch den karierten Teil hinten sticht ihr Kind heraus. Ein Kleidchen das auch mal dreckig werden darf. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "80",
        material: ["Wolle"],
        pattern: "einfarbig",
      }
    },
    {
      ipfs_car: cids[9],
      price: "44,44",
      description: "Ein Design für eine Prinzessin! Das Kleidchen, dass beim nächsten Kindergeburtstag sicher hervorsticht. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "99",
        material: ["Wolle", "Viskose"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[10],
      price: "42,45",
      description: "Ein Design gemacht für einen besonderen Anlass. Eine kleine Blume auf der Brust ziert das Kleidchen. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Wolle", "Viskose"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[11],
      price: "31,78",
      description: "Ein fröhliches Design inspiriert von langen Sommerabenden. Ein Schmetterling auf der Brust ziert das Kleidchen. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Schurwolle", "Viskose"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[12],
      price: "35,80",
      description: "Ein Design das von Lebensfreude nun so trotzt. Ausgezeichnet für warme Tage am Strand. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "92",
        material: ["Baumwolle", "Polyester"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[13],
      price: "40,99",
      description: "Die Blaue Farbe strahlt Ruhe und Vertrautheit aus. Ein schönes Kleidchen für einen Wintermorgen. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "92",
        material: ["Viskose", "Polyester"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[14],
      price: "41,79",
      description: "Mit einem Kleidchen wie diesem kann stolz im Kindergarten herumgetollt werden. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Viskose", "Polyester"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[15],
      price: "28,40",
      description: "Das Design verkörpert die Schönheit der Natur. Perfekt zum Besuch bei den Großeltern. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "92",
        material: ["Viskose"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[16],
      price: "29,29",
      description: "Ein Kleidchen das auch mal dreckig werden darf. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Viskose"],
        pattern: "einfarbig",
      }
    },
    {
      ipfs_car: cids[17],
      price: "30,79",
      description: "Ein Design gemacht für einen besonderen Anlass. Eine kleine Blume auf der Brust ziert das Kleidchen. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Viskose", "Wolle"],
        pattern: "gestreift",
      }
    },
    {
      ipfs_car: cids[18],
      price: "34,75",
      description: "Ein Design für eine Prinzessin! Das Kleidchen, dass beim nächsten Kindergeburtstag sicher hervorsticht. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "92",
        material: ["Viskose", "Polyester"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[19],
      price: "32,89",
      description: "Das Design verkörpert die Schönheit der Natur. Perfekt zum Besuch bei den Großeltern. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Viskose", "Schurwolle"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[20],
      price: "26,99",
      description: "Durch den karierten Teil sticht ihr Kind heraus. Ein Kleidchen das auch mal dreckig werden darf. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Viskose"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[21],
      price: "33,79",
      description: "Ein Design für eine Prinzessin! Das Kleidchen, dass beim nächsten Kindergeburtstag sicher hervorsticht. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "92",
        material: ["Viskose", "Baumwolle"],
        pattern: "kariert",
      }
    },
    {
      ipfs_car: cids[22],
      price: "55,89",
      description: "Ein Design gemacht für einen besonderen Anlass. Eine kleine Blume auf der Brust ziert das Kleidchen. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "93",
        material: ["Viskose"],
        pattern: "einfarbig",
      }
    },
    {
      ipfs_car: cids[23],
      price: "42,50",
      description: "Ein fröhliches Design inspiriert von langen Sommerabenden. Es soll an einen Sonnenuntergang erinnern. Das Borbus Etikett bestätigt die Echtheit und Einzigartigkeit.",
      attributes: {
        compatibility: ["Atmungsaktiv", "Hautfreundlich"],
        size: "98",
        material: ["Viskose"],
        pattern: "einfarbig",
      }
    }
  ]
}
