//This is a mockup test class to test class based story query
global with sharing class GetContentNoteAsStory implements Callable
{
            public Object call(String action, Map<String,Object> args)
            {
                Map<String,Object> inputMap = (Map<String,Object>)args.get('input');
                Map<String,Object> outMap = (Map<String,Object>)args.get('output');
                Map<String,Object> options = (Map<String,Object>)args.get('options');

                return invokeMethod(action, inputMap, outMap, options);
            }
    
    global Object invokeMethod(String methodName,Map<String,Object> inputs, Map<String,Object> output, Map<String,Object> options)
    {
        Boolean success = true;
        try
        {
            if(methodName == 'getContentNotes')
            {
                success = getContentNotes(inputs, output, options);
            }
        }
        catch (Exception e)
        {
            System.debug('Error invoke method: ' + methodName + ' with error: '+ e);
            success = false;
            throw e;
        }
        return success;
    }

    private Boolean getContentNotes(Map<String,Object> input, Map<String,Object> output, Map<String,Object> options)
    {
        String parentObjName = (String) input.get('parentObjName');
        String objName = (String) input.get('storyObjType');
        List<Object> objIdList1 = (List<Object>) input.get('objIds');
        List<Id> objIdList = new List<Id>();
        integer queryRecordLimit = (integer) input.get('pageSize');
        DateTime lastDate = (DateTime) input.get('lastActivityDate');
        List<Object> listOfStories = new List<Object>();

        if (queryRecordLimit == null) queryRecordLimit = 10;

        for (Object objId : objIdList1) objIdList.add((Id) objId);

        //query for content note for parentObject
        List<ContentDocumentLink> docLinks = [
            SELECT ContentDocumentId, Id, LinkedEntityId
            FROM ContentDocumentLink
            WHERE LinkedEntityId IN :objIdList
        ];
        // ShareType, SystemModstamp, Visibility

        List<Id> docIdList= new List<Id>();
        Map<Id, Id> objIdContentDocIdMap = new Map<Id, Id>();
        if (docLinks != null && docLinks.size() > 0)
        {
            for (ContentDocumentLink docLink :docLinks )
            {
                docIdList.add(docLink.ContentDocumentId);
                objIdContentDocIdMap.put(docLink.ContentDocumentId, docLink.LinkedEntityId);
            }

            List<String> fields = new List<String>
            {
                'Id',
                'FileExtension',
                'FileType',
                'Title',
                'Content',
                'TextPreview',
                'LastModifiedBy.Name',
                'LastModifiedDate',
                'CreatedById',
                'CreatedBy.Name',
                'CreatedBy.Title',
                'OwnerId',
                'Owner.Name',
                'Owner.Title'
                // available
                // 'CreatedDate'
            };

            String objQuery = 'SELECT ' + String.join(fields, ', ') + ' ';
            objQuery += 'FROM ContentNote ';
            objQuery += 'WHERE Id IN :docIdList ';
            objQuery += 'AND LastModifiedDate != null ';
            if (lastDate != null)
            {
                objQuery += ' AND LastModifiedDate <= :lastDate ';
            }
            objQuery += ' LIMIT '+String.valueOf(queryRecordLimit);

            System.debug(' GetContentNoteAsStory: objQuery is '+objQuery);

            List<ContentNote> listContentNote = Database.query(objQuery);

            for (ContentNote cnote : listContentNote)
            {
                Map<String, Object> resultMap = new Map<String, Object>();
                DateTime LastActDate = cnote.LastModifiedDate;

                Map<String, String> summaryLabelMap = new Map<String, String>();
                summaryLabelMap.put('Title', 'Title');
                summaryLabelMap.put('Subtitle', 'Content');

                Map<String, String> summaryValueMap = new Map<String, String>();
                summaryValueMap.put('Title', cnote.Title);
                summaryValueMap.put('Subtitle', cnote.Content.toString());

                Map<String, String> detailMap = new Map<String, String> ();

                // String ownerValId = String.valueOf(cnote.CreatedById);
                // User owner = cnote.CreatedBy;
                // Map<String, Object> ownersMap = new Map<String, Object>
                // {
                //     'ID' => cnote.CreatedById,
                //     'Owner' => owner.Name,
                //     'Title' => owner.Title
                // };

                String ownerValId = String.valueOf(cnote.OwnerId);
                User owner = cnote.Owner;
                Map<String, Object> ownersMap = new Map<String, Object>
                {
                    'ID' => cnote.OwnerId,
                    'Owner' => owner.Name,
                    'Title' => owner.Title
                };
                System.debug(' GetContentNoteAsStory: ownersMap is '+ownersMap);

                Boolean isDate = false;
                String idValue = String.valueOf(cnote.Id);
                String lastModify = (String) cnote.getSObject('LastModifiedBy').get('Name');
                String image;
                String parentRecId = objIdContentDocIdMap.get(cnote.Id);
                String parentRecName;
                String navPath;
                String objDef = 'ContentNote';
                String parObjType=parentObjName;
                //String ownerId=cnote.CreatedById;
                //String ownerId = cnote.OwnerId;
                String ownerId = cnote.LastModifiedBy.Id;

                resultMap.put('lastActDate', LastActDate);
                resultMap.put('summaryLabelMap', summaryLabelMap);
                resultMap.put('summaryValueMap', summaryValueMap);

                resultMap.put('detailValueMap', detailMap);
                resultMap.put('IdValue', idValue);
                resultMap.put('imageRef', image);
                resultMap.put('sortFieldIsDate', isDate);
                resultMap.put('parentId',parentRecId);
                resultMap.put('parentName', parentRecName);
                resultMap.put('navigateLink', navPath);
                resultMap.put('objAPIName', objDef);
                resultMap.put('parentObjAPIName', parObjType);
                // resultMap.put('owner', cnote.CreatedById);
                //resultMap.put('owner', cnote.OwnerId);
                resultMap.put('owner', cnote.LastModifiedBy.Id);
                resultMap.put('modified', lastModify);
                resultMap.put('ownerValueMap', ownersMap);
                listOfStories.add(resultMap);
            }
        }

        if (listOfStories != null && listOfStories.size() > 0)
        {

            output.put('stories', listOfStories);
        }
        return true;
    }
}