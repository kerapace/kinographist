json.key_format! camelize: :lower

json.partial! 'api/list_elements/element', list: @list, element: @element

json.partial! 'api/lists/preview', list: @list