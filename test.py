import sys
import json
import torch
import io
import submission
from functools import wraps

class Capturing(list):
    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = self._stringio = io.StringIO()
        return self

    def __exit__(self, *args):
        self.extend(self._stringio.getvalue().splitlines())
        sys.stdout = self._stdout

if __name__ == '__main__':
    torch.manual_seed(0)
    original_state = torch.random.get_rng_state()
    response = {}
    class_name = sys.argv[1]
    inputs = []
    inits = []
    generator = torch.Generator()
    generator.manual_seed(0) #
    if len(sys.argv) <= 4:
        inputs.append(torch.tensor(json.loads(sys.argv[3]), dtype=torch.float32)) # input
    elif len(sys.argv) == 5:
        inputs.append(torch.tensor(json.loads(sys.argv[3]), dtype=torch.float32)) # y_pred
        inputs.append(torch.tensor(json.loads(sys.argv[4]))) # y_true
    elif len(sys.argv) >= 6:
        for a in sys.argv[3:-1]:
            inits.append(json.loads(a)) # dim_in
        # inits.append(json.loads(sys.argv[3])) # dim_in
        # inits.append(json.loads(sys.argv[4])) # dim_out
        inputs.append(torch.tensor(json.loads(sys.argv[-1]), dtype=torch.float32)) # input
        #inits.append(generator)
    else:
        pass
    try:
        class_ref = getattr(submission, class_name)
    except AttributeError:
        raise ValueError(f"Unknown function name: {class_name}")
   
    
    m = class_ref(*inits)
    
    with Capturing() as output:
        pass
        try:
            pred = m(*inputs)
            response['result'] = str(pred)
            if len(sys.argv) == 5:
                torch.testing.assert_close(pred, torch.tensor(json.loads(sys.argv[2]), dtype=torch.float32).squeeze(), rtol=1e-2, atol=1e-4)
            else:
                torch.testing.assert_close(pred, torch.tensor(json.loads(sys.argv[2]), dtype=torch.float32), rtol=1e-2, atol=1e-4)
            response['message'] = 'passed'
        except AssertionError as e:
            # if len(sys.argv) > 5:
            #     try:
            #         torch.testing.assert_close(pred, torch.tensor(json.loads(sys.argv[3]), dtype=torch.float32), rtol=1e-2, atol=1e-4)
            #     except:
            #         response['message'] = f'failed: {e}'
            # else:
                response['message'] = f'failed: {e}'
    
    response['out'] = "\n".join(output)
    print(json.dumps(response))
    torch.random.set_rng_state(original_state)
