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
  filterBusinesses = graphene.Field(
    lambda: graphene.List(Business), 
    size=graphene.String(),
    recreated=graphene.Boolean(),
    area=graphene.Int(),
    licensed=graphene.Boolean(),
    business_type=graphene.String(),
    type_=graphene.Int(),
  )
  
  def resolve_getBusiness(args, info, uuid):
    query = Business.get_query(info)

    return query.get(uuid)

  def resolve_filterBusinesses(args, info, 
                               size=None, recreated=None, area=None,
                               licensed=None, business_type=None, type_=None):
    query = Business.get_query(info)

    if size:
      query = query.filter_by(size=size)
    if recreated is not None:
      if recreated != '_':
        query = query.filter_by(recreated=recreated)
    if area:
      query = query.filter_by(area=area)
    if licensed is not None:
      if licensed != '_':
        query = query.filter_by(licensed=licensed)
    if business_type:
      if business_type != '_':
        query = query.filter_by(business_type=business_type)
    if type_:
      if type_ != 0:
        query = query.filter_by(type=type_)
    # Issue: Need to filter type_ by first 2 chars

    response = query.all()

    return response


schema = graphene.Schema(query=Query, types=[Business])