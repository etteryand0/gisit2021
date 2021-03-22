import graphene
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from models import *

class Business(SQLAlchemyObjectType):
  class Meta:
    model = BusinessModel
    interfaces = (graphene.relay.Node, )

        
class Query(graphene.ObjectType):
  node = graphene.relay.Node.Field()
  getBusiness = graphene.Field(Business, uuid = graphene.Int())
  allBusinesses = graphene.Field(Business)
  
  def resolve_getBusiness(args, info, uuid):
    query = Business.get_query(info)
    # print(dir(query))
    return query.get(uuid)

  def resolve_allBusinesses(args, info):
    pass

schema = graphene.Schema(query=Query, types=[Business])