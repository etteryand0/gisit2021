import graphene
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from models import *

class Business(SQLAlchemyObjectType):
  class Meta:
    model = BusinessModel
    interfaces = (graphene.relay.Node, )

        
class Query(graphene.ObjectType):
  node = graphene.relay.Node.Field()
  business = graphene.Field(Business, uuid = graphene.Int())
  
  def resolve_business(args, info, uuid):
    query = Business.get_query(info)
    return query.get(uuid)

schema = graphene.Schema(query=Query, types=[Business])