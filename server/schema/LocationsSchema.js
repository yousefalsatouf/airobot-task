const graphql= require('graphql');
const PointDraws = require('../models/PointsModel')
const PolygonDraws = require('../models/PolygonsModel')
const { 
     GraphQLObjectType,
     GraphQLString,
     GraphQLInt,
     GraphQLSchema, 
     GraphQLID, 
     GraphQLList,
     GraphQLFloat,
     GraphQLInputObjectType
 } = graphql;

 const PointGeometry = new GraphQLObjectType({
     name: 'PointGeometry',
     fields: () => ({
       type: {
         type: GraphQLString
       },
       coordinates: {
         type: new GraphQLList(GraphQLFloat)
       },
     }),
   })

   const PolygonGeometry = new GraphQLObjectType({
     name: 'PolygonGeometry',
     fields: () => ({
       type: {
         type: GraphQLString
       },
       coordinates: {
         type: new GraphQLList(new GraphQLList(new GraphQLList(GraphQLFloat)))
       },
     }),
   })

   const Properties = new GraphQLObjectType({
        name: 'Properties',
        fields: () => ({
          info: {
               type: GraphQLString
          },
        })
   })


   const PointDrawsType = new GraphQLObjectType({
     name: 'PointDrawsType',
          fields: () => ({
          type: {
               type: GraphQLString
          },
          properties: {
               type: Properties
          },
          geometry: {
               type: PointGeometry
          },
     }),
   });

   const PolygonDrawsType = new GraphQLObjectType({
     name: 'PolygonDrawsType',
          fields: () => ({
          type: {
               type: GraphQLString
          },
          properties: {
               type: Properties
          },
          geometry: {
               type: PolygonGeometry
          },
     }),
   });


// queries ...
   const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
          points: {
               type: new GraphQLList(PointDrawsType),
               resolve: () => {
                    return PointDraws.find({})
               }
          },
          polygons: {
               type: new GraphQLList(PolygonDrawsType),
               resolve: () => {
                    return PolygonDraws.find({})
               }
          },
     }
});

// create inputs 
/*
const PropertiesInput = new GraphQLInputObjectType({
     name: 'PropertiesInput',
     fields: () => ({
       info: {
            type: GraphQLString
          },
     })
})


const GeometryInput = new GraphQLInputObjectType({
     name: 'GeometryInput',
     fields: () => ({
          type: {
               type: GraphQLString
          },
          coordinates: {
               type: new GraphQLList(GraphQLFloat)
          },
     })
})


const Mutation= new GraphQLObjectType({
     name: 'Mutation',
     fields: {
          addPointDraw: {
               type: PointDrawType,
               args: {
                    type: { type: GraphQLString},
                    properties: {type: PropertiesInput},
                    geometry: {type: GeometryInput},
               },
               resolve: (parent, args)=> {
                    let draws= new PointDraw({
                         type: args.type,
                         properties: args.properties,
                         geometry: args.geometry,
                    });
                   return  draws.save();
               }
          },
     },
})

*/
module.exports = new GraphQLSchema({
     query: RootQuery,
     //mutation: Mutation
})


