def model(item_id, num_list):
    try:
        num_dict = {}
        
        for i in range(len(num_list)):
            num_dict[str(i)] = num_list[i][0]
        
        return num_dict
    
    
    except Exception as e:
        print(e)