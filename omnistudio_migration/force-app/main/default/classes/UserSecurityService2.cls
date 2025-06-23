global with sharing class UserSecurityService2 implements Callable
{
            public Object call(String action, Map<String,Object> args)
            {
                Map<String,Object> inputMap = (Map<String,Object>)args.get('input');
                Map<String,Object> outMap = (Map<String,Object>)args.get('output');
                Map<String,Object> options = (Map<String,Object>)args.get('options');

                return invokeMethod(action, inputMap, outMap, options);
            }
    
    public Boolean invokeMethod(
        String methodName,
        Map<String, Object> inputs,
        Map<String, Object> output,
        Map<String, Object> options)
    {
        if (methodName == 'encrypt') {
            return encrypt(inputs, output, options);
        }
        if (methodName == 'encryptIfNecessary') {
            return encryptIfNecessary(inputs, output, options);
        }
        if (methodName == 'decrypt') {
            return decrypt(inputs, output, options);
        }
        if (methodName == 'decryptIfNecessary') {
            return decryptIfNecessary(inputs, output, options);
        }
        return false;
    }

    private Boolean encrypt(
        Map<String,Object> inputs,
        Map<String,Object> output,
        Map<String,Object> options)
    {
        String id = (String) options.get('id');
        output.put('encryptedId', vlocity_ins.UserSecurity.encrypt(id));
        return true;
    }

    private Boolean encryptIfNecessary(
        Map<String,Object> inputs,
        Map<String,Object> output,
        Map<String,Object> options)
    {
        String id = (String) options.get('id');
        output.put('encryptedId', vlocity_ins.InsUserSecurity.encryptIfNecessary(id));
        return true;
    }

    private Boolean decrypt(
        Map<String,Object> inputs,
        Map<String,Object> output,
        Map<String,Object> options)
    {
        String id = (String) options.get('id');
        output.put('decryptedId', vlocity_ins.UserSecurity.decrypt(id));
        return true;
    }

    private Boolean decryptIfNecessary(
        Map<String,Object> inputs,
        Map<String,Object> output,
        Map<String,Object> options)
    {
        String id = (String) options.get('id');
        output.put('decryptedId', vlocity_ins.InsUserSecurity.decryptIfNecessary(id));
        return true;
    }

}